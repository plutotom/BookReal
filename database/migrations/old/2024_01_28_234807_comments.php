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
        Schema::create('Comments', function (Blueprint $table) {
            $table->id('comment_id');
            // $table->id();
            $table->timestamps();

            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('ponder_id')->constrained('ponders');
            $table->foreignId('parent_comment_id')->nullable()->constrained('comments');
            $table->string('comment_text');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('Comments', function (Blueprint $table) {
            $table->dropForeign(['user_id', 'ponder_id', 'parent_comment_id']);
        });
    
        Schema::dropIfExists('Comments');
    }
};
