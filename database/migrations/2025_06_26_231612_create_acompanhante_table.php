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
        Schema::create('acompanhante', function (Blueprint $table) {
            $table->id();
            $table->string('parentesco', 50);
            $table->foreignId('paciente_id')->constrained('paciente');
            $table->timestamps();
            
            $table->foreign('id')->references('id')->on('pessoa');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acompanhante');
    }
};
