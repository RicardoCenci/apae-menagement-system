<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function () {

	// Public routes
	Route::group(['middleware' => 'auth:api'], function () {
		Route::prefix('auth')->group(function () {
			Route::post('login', [AuthController::class, 'login'])->name('login');
			Route::post('register', [AuthController::class, 'register']);
		});
	});


	// Protected routes
	Route::group(['middleware' => 'auth:api'], function () {

		Route::prefix('auth')->group(function () {
			Route::post('logout', [AuthController::class, 'logout']);
			Route::post('refresh', [AuthController::class, 'refresh']);
			Route::get('me', [AuthController::class, 'me']);
		});
	});

});
