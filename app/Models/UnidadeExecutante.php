<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnidadeExecutante extends Model
{
	protected $table = 'unidade_executante';

	protected $fillable = [
		'nome'
	];
}
