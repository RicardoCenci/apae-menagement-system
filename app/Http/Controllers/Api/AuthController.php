<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
	public function __construct()
	{
		$this->middleware('auth:api', ['except' => ['login', 'register']]);
	}

	public function login(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'email' => 'required|email',
			'password' => 'required|string|min:6',
		]);

		if ($validator->fails()) {
			return response()->json($validator->errors(), 422);
		}

		if (!$token = auth('api')->attempt($validator->validated())) {
			return response()->json(['error' => 'Invalid credentials'], 401);
		}

		return $this->createNewToken($token);
	}

	public function register(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'name' => 'required|string|between:2,100',
			'email' => 'required|string|email|max:100|unique:users',
			'password' => 'required|string|confirmed|min:6',
		]);

		if ($validator->fails()) {
			return response()->json($validator->errors()->toJson(), 400);
		}

		$user = User::create(array_merge(
			$validator->validated(),
			['password' => Hash::make($request->password)]
		));

		return response()->json([
			'message' => 'User successfully registered',
			'user' => $user
		], 201);
	}

	public function logout()
	{
		auth('api')->logout();

		return response()->json(['message' => 'Successfully logged out']);
	}

	public function refresh()
	{
		return $this->createNewToken(auth('api')->refresh());
	}

	public function me()
	{
		return response()->json(auth('api')->user());
	}

	protected function createNewToken($token)
	{
		return response()->json([
			'access_token' => $token,
			'token_type' => 'bearer',
			'expires_in' => auth('api')->factory()->getTTL() * 60,
			'user' => auth('api')->user()
		]);
	}
}
