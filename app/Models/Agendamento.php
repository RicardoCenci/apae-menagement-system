<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agendamento extends Model
{
	protected $table = 'agendamento';

	protected $fillable = [
		'protocolo_gercon',
		'tipo_consulta_id',
		'data_agenda',
		'hora_inicio',
		'hora_fim',
		'sequencia',
		'profissional_id',
		'sala',
		'paciente_id',
		'unidade_executante_id',
		'especialidade_id',
		'cid_principal_id',
		'procedimento_id',
		'situacao_id',
		'situacao_agendamento_id',
		'mutirao',
	];

	public function tipoConsulta()
	{
		return $this->belongsTo(TipoConsulta::class);
	}

	public function profissional()
	{
		return $this->belongsTo(Profissional::class);
	}

	public function paciente()
	{
		return $this->belongsTo(Paciente::class);
	}

	public function unidadeExecutante()
	{
		return $this->belongsTo(UnidadeExecutante::class);
	}

	public function especialidade()
	{
		return $this->belongsTo(Especialidade::class);
	}

	public function cidPrincipal()
	{
		return $this->belongsTo(Cid::class, 'cid_principal_id');
	}

	public function procedimento()
	{
		return $this->belongsTo(Procedimento::class);
	}

	public function situacao()
	{
		return $this->belongsTo(Situacao::class);
	}

	public function situacaoAgendamento()
	{
		return $this->belongsTo(SituacaoAgendamento::class);
	}
}
