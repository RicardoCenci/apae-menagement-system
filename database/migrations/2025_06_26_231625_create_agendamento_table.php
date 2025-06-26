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
        Schema::create('agendamento', function (Blueprint $table) {
            $table->id();
            $table->string('protocolo_gercon', 50)->nullable();
            $table->foreignId('tipo_consulta_id')->nullable()->constrained('tipo_consulta');
            $table->date('data_agenda');
            $table->time('hora_inicio')->nullable();
            $table->time('hora_fim')->nullable();
            $table->integer('sequencia')->nullable();
            $table->foreignId('profissional_id')->constrained('profissional');
            $table->string('sala', 50)->nullable();
            $table->foreignId('paciente_id')->constrained('paciente');
            $table->foreignId('unidade_executante_id')->nullable()->constrained('unidade_executante');
            $table->foreignId('especialidade_id')->nullable()->constrained('especialidade');
            $table->foreignId('cid_principal_id')->nullable()->constrained('cid');
            $table->foreignId('procedimento_id')->nullable()->constrained('procedimento');
            $table->foreignId('situacao_id')->nullable()->constrained('situacao');
            $table->foreignId('situacao_agendamento_id')->nullable()->constrained('situacao_agendamento');
            $table->boolean('mutirao')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('agendamento');
    }
};
