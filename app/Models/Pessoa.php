<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pessoa extends Model
{
	protected $table = 'pessoa';

	protected $fillable = [
		'nome',
		'cpf',
		'data_nascimento',
		'sexo',
		'estado_civil_id',
		'raca_cor_id',
		'nome_mae',
		'nacionalidade_id',
	];

	public function estadoCivil()
	{
		return $this->belongsTo(EstadoCivil::class);
	}

	public function racaCor()
	{
		return $this->belongsTo(RacaCor::class);
	}

	public function nacionalidade()
	{
		return $this->belongsTo(Nacionalidade::class);
	}

	public function enderecos()
	{
		return $this->hasMany(Endereco::class);
	}
}
