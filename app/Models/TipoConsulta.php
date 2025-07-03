<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoConsulta extends Model
{
	protected $table = 'tipo_consulta';

	protected $fillable = [
		'descricao',
	];
}
