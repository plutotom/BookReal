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
        Schema::create('ponder_week_user', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('ponder_week_id')->constrained();
            $table->foreignId('user_id')->constrained();
            // Add any additional columns if needed
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ponder_week_user');
    }
};
