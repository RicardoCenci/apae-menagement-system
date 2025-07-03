<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{
	protected $table = 'endereco';

	protected $fillable = [
		'pessoa_id',
		'logradouro',
		'numero',
		'telefone',
		'complemento',
		'bairro',
		'municipio_ibge',
		'municipio_nome',
		'cep',
	];

	public function pessoa()
	{
		return $this->belongsTo(Pessoa::class);
	}
}
