<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Especialidade extends Model
{
	protected $table = 'especialidade';

	protected $fillable = [
		'codigo',
		'descricao',
	];
}
