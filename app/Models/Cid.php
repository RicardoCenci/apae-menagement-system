<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cid extends Model
{
	protected $table = 'cid';

	protected $fillable = [
		'codigo',
		'descricao',
	];
}
