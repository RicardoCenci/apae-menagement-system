<?php

namespace App\Import;

use App\Models\Agendamento;
use App\Models\Cid;
use App\Models\Endereco;
use App\Models\Especialidade;
use App\Models\EstadoCivil;
use App\Models\Nacionalidade;
use App\Models\Paciente;
use App\Models\Pessoa;
use App\Models\Procedimento;
use App\Models\Profissional;
use App\Models\RacaCor;
use App\Models\Situacao;
use App\Models\TipoConsulta;
use App\Models\UnidadeExecutante;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use App\Helpers\Helpers;
use Carbon\Carbon;

class GerconImport implements ToCollection, WithHeadingRow, WithChunkReading
{
	use Importable;

	protected $data = null;

	public function __construct()
	{
		$this->data = new Collection();
	}

	public function collection(Collection $rows)
	{
		foreach ($rows as $row) {
			$row['id'] = $row[''] ?? null;

			if ($this->isValidAgendamento($row)) {
				$this->data->add($row);
			}
		}
	}

	public function chunkSize(): int
	{
		return 500;
	}

	private function isValidAgendamento(Collection $row): bool
	{
		return !empty($row['cpf_do_paciente']) && $row['situacao'] != 'LIVRE';
	}

	public function getData(): Collection
	{
		return $this->data;
	}

	public function saveSelected(array $indexes)
	{
		$saved = [];
		foreach ($indexes as $i) {
			$row = $this->data->get($i);
			dd($this->data);
			if (!$row) continue;

			DB::beginTransaction();
			try {
				// 1. Pessoa do paciente
				$cpfPaciente = isset($row['cpf_do_paciente']) ? Helpers::removeCaracteresEspeciais($row['cpf_do_paciente']) : null;

				$dataNascimento = null;
				if (!empty($row['nascimento_do_paciente'])) {
					try {
						$dataNascimento = Carbon::createFromFormat('d/m/Y', $row['nascimento_do_paciente'])->format('Y-m-d');
					} catch (\Exception $e) {
						$dataNascimento = $row['nascimento_do_paciente'];
					}
				}

				// Ajusta sexo para primeira letra maiúscula
				$sexo = null;
				if (!empty($row['sexo_do_paciente'])) {
					$sexo = strtoupper(substr(trim($row['sexo_do_paciente']), 0, 1));
				}

				$pessoaPaciente = Pessoa::firstOrCreate([
					'cpf' => $cpfPaciente
				], [
					'nome' => $row['nome_do_paciente'] ?? null,
					'data_nascimento' => $dataNascimento,
					'sexo' => $sexo,
					'estado_civil_id' => $row['estado_civil_do_paciente'] ? EstadoCivil::firstOrCreate(['descricao' => $row['estado_civil_do_paciente']])->id : null,
					'raca_cor_id' => $row['racacor_do_paciente'] ? RacaCor::firstOrCreate(['descricao' => $row['racacor_do_paciente']])->id : null,
					'nome_mae' => $row['mae_do_paciente'] ?? null,
					'nacionalidade_id' => $row['nacionalidade_do_paciente'] ? Nacionalidade::firstOrCreate(['descricao' => $row['nacionalidade_do_paciente']])->id : null,
				]);

				// 2. Endereço do paciente
				Endereco::updateOrCreate([
					'pessoa_id' => $pessoaPaciente->id,
					'logradouro' => $row['logradouro_do_end_do_paciente'] ?? null,
					'numero' => $row['numero_do_end_do_paciente'] ?? null,
				], [
					'telefone' => $row['telefones'] ?? null,
					'complemento' => $row['complemento_do_end_paciente'] ?? null,
					'bairro' => $row['bairro_do_end_do_paciente'] ?? null,
					'municipio_ibge' => $row['municipio_ibge_do_end_paciente'] ?? null,
					'municipio_nome' => $row['municipio_do_end_do_paciente'] ?? null,
					'cep' => $row['cep_do_end_do_paciente'] ?? null,
				]);

				// 3. Paciente
				$paciente = Paciente::firstOrCreate([
					'cartao_sus' => $row['cartao_sus'] ?? null,
				], [
					'pessoa_id' => $pessoaPaciente->id,
				]);

				// 4. Especialidade
				$especialidade = null;
				if (!empty($row['codigo_da_especialidade'])) {
					$especialidade = Especialidade::firstOrCreate([
						'codigo' => $row['codigo_da_especialidade']
					], [
						'descricao' => $row['descricao_da_especialidade'] ?? null
					]);
				}

				// 5. Pessoa do profissional
				$cpfProfissional = isset($row['cpf_profissional']) ? Helpers::removeCaracteresEspeciais($row['cpf_profissional']) : null;

				$pessoaProf = Pessoa::firstOrCreate([
					'cpf' => $cpfProfissional
				], [
					'nome' => $row['profissional'] ?? null,
				]);

				// 6. Profissional
				$profissional = Profissional::firstOrCreate([
					'pessoa_id' => $pessoaProf->id
				], [
					'especialidade_id' => $especialidade ? $especialidade->id : null,
				]);


				// 7. CID
				$cid = null;
				if (!empty($row['codigo_do_cid_principal'])) {
					$cid = Cid::firstOrCreate([
						'id' => $row['codigo_do_cid_principal']
					], [
						'nome' => $row['descricao_do_cid_principal'] ?? null
					]);
				}

				// 8. Procedimento
				$procedimento = null;
				if (!empty($row['codigo_procedimento'])) {
					$procedimento = Procedimento::firstOrCreate([
						'id' => $row['codigo_procedimento']
					], [
						'nome' => $row['nome_procedimento'] ?? null
					]);
				}

				// 9. Unidade Executante
				$unidade = UnidadeExecutante::firstOrCreate([
					'nome' => $row['unidade_executante'] ?? null
				]);

				// 10. Tipo Consulta
				$tipoConsulta = TipoConsulta::firstOrCreate([
					'descricao' => $row['tipo_de_consulta'] ?? null
				]);

				// 11. Situação
				$situacao = Situacao::firstOrCreate([
					'descricao' => $row['situacao'] ?? null
				]);

				// 12. Agendamento
				$dataAgenda = null;
				if (!empty($row['data_agenda'])) {
					try {
						$dataAgenda = Carbon::createFromFormat('d/m/Y', $row['data_agenda'])->format('Y-m-d');
					} catch (\Exception $e) {
						$dataAgenda = $row['data_agenda'];
					}
				}

				if (!empty($row['mutirao']) && strtolower($row['mutirao']) === 'sim') {
					$mutirao = true;
				} else {
					$mutirao = false;
				}

				$agendamento = Agendamento::create([
					'protocolo_gercon' => $row['protocolo_gercon'] ?? null,
					'tipo_consulta_id' => $tipoConsulta->id ?? null,
					'data_agenda' => $dataAgenda,
					'hora_inicio' => $row['hora_inicial'] ?? null,
					'hora_fim' => $row['hora_final'] ?? null,
					'sequencia' => $row['sequencia'] ?? null,
					'profissional_id' => $profissional->id ?? null,
					'sala' => $row['sala'] ?? null,
					'paciente_id' => $paciente->id ?? null,
					'unidade_executante_id' => $unidade->id ?? null,
					'especialidade_id' => $especialidade ? $especialidade->id : null,
					'cid_principal_id' => $cid ? $cid->id : null,
					'procedimento_id' => $procedimento ? $procedimento->id : null,
					'situacao_id' => $situacao->id ?? null,
					'situacao_agendamento_id' => $situacaoAgendamento->id ?? null,
					'mutirao' => $mutirao,
				]);

				$saved[] = $agendamento;
				DB::commit();
			} catch (\Exception $e) {
				DB::rollBack();
				throw $e; // Re-throw the exception to handle it outside
			}
		}
		return $saved;
	}
}
