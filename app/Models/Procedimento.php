<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Procedimento extends Model
{
	protected $table = 'procedimento';

	protected $fillable = [
		'codigo',
		'nome',
	];
}
