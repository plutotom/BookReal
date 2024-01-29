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
        Schema::create('PonderWeek', function (Blueprint $table) {
            // $table->id();
            $table->id('user_activity_id');
            $table->foreignId('user_id')->constrained('users');
            $table->datetime('week_start_date');
            // Other user activity attributes
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('PonderWeek');
    }
};
