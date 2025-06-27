<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pessoa', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 150);
            $table->string('cpf', 14)->unique();
            $table->date('data_nascimento')->nullable();
            $table->char('sexo', 1)->nullable();
            $table->foreignId('estado_civil_id')->nullable()->constrained('estado_civil');
            $table->foreignId('raca_cor_id')->nullable()->constrained('raca_cor');
            $table->string('nome_mae', 150)->nullable();
            $table->foreignId('nacionalidade_id')->nullable()->constrained('nacionalidade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pessoa');
    }
};
