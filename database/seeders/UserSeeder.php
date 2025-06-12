<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		// Create a test user
		User::firstOrCreate(
			['email' => 'admin@test.com'],
			[
				'name' => 'Admin User',
				'email' => 'admin@test.com',
				'password' => Hash::make('password123'),
			]
		);

		// Create additional test users
		User::firstOrCreate(
			['email' => 'user@test.com'],
			[
				'name' => 'Test User',
				'email' => 'user@test.com',
				'password' => Hash::make('password123'),
			]
		);
	}
}
