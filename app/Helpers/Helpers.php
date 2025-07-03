<?php

namespace App\Helpers;

class Helpers
{
	public static function removeCaracteresEspeciais($string)
	{
		$string = preg_replace('/[^a-zA-Z0-9\s]/', '', $string);

		$string = preg_replace('/\s+/', ' ', $string);

		$string = trim($string);

		return $string;
	}
}
