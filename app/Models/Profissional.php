<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profissional extends Model
{
	protected $table = 'profissional';

	protected $fillable = [
		'pessoa_id',
		'especialidade_id',
	];

	public function pessoa()
	{
		return $this->belongsTo(Pessoa::class, 'pessoa_id');
	}

	public function especialidade()
	{
		return $this->belongsTo(Especialidade::class);
	}
}
