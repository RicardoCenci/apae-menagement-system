<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Acompanhante extends Model
{
	protected $table = 'acompanhante';

	protected $fillable = [
		'pessoa_id',
		'parentesco',
		'paciente_id',
	];

	public function pessoa()
	{
		return $this->belongsTo(Pessoa::class, 'pessoa_id');
	}

	public function paciente()
	{
		return $this->belongsTo(Paciente::class);
	}
}
