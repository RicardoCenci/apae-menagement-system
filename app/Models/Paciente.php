<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paciente extends Model
{
	protected $table = 'paciente';

	protected $fillable = [
		'pessoa_id',
		'cartao_sus',
	];

	public function pessoa()
	{
		return $this->belongsTo(Pessoa::class, 'pessoa_id');
	}

	public function acompanhantes()
	{
		return $this->hasMany(Acompanhante::class);
	}
}
