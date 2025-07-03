<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Import\GerconImport;
use App\Models\RacaCor;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Throwable;

class ImportController extends Controller
{

	public function import(Request $request)
	{
		try {
			$importable = new GerconImport();

			Excel::import($importable, $request->file('file'), null, \Maatwebsite\Excel\Excel::XLSX);

			return response()->json([$importable->getData()], 200);
		} catch (Throwable $e) {
			return response()->json(['error' => 'Erro ao importar o arquivo: ' . $e->getMessage()], 400);
		}
	}

	public function save(Request $request)
	{
		try {
			$importable = new GerconImport();

			Excel::import($importable, $request->file('file'), null, \Maatwebsite\Excel\Excel::XLSX);

			$saved = $importable->saveSelected();

			return response()->json(['saved' => $saved], 200);
		} catch (Throwable $e) {
			return response()->json(['error' => 'Erro ao importar o arquivo: ' . $e->getMessage()], 400);
		}
	}
}
