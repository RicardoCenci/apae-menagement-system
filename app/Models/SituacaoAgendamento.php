<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SituacaoAgendamento extends Model
{
	protected $table = 'situacao_agendamento';

	protected $fillable = [
		'descricao',
	];
}
