<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RacaCor extends Model
{
	protected $table = 'raca_cor';

	protected $fillable = [
		'descricao',
	];
}
