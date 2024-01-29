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

        Schema::create('book_reals', function (Blueprint $table) {
            $table->string('title');
            $table->string('ponder', 1000);
            $table->string('quote', 1000);
            $table->id();
            $table->timestamps();

            // Adding a foreign key to link with the users table
            $table->unsignedBigInteger('user_id'); // Assuming your users table uses 'id' as the primary key

            // Creating a foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_reals');
    }
};
