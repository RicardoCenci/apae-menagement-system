<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Nacionalidade extends Model
{
	protected $table = 'nacionalidade';

	protected $fillable = [
		'descricao',
	];
}
