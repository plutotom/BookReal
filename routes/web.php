<?php

use App\Http\Controllers\BookRealController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get("/info", function() {
    echo phpinfo();
});

Route::get('/', function () {
    // if logged in, then redirect to book real, else redirect to login
    if (Route::has('login')) {
        return redirect()->route('bookReal.getBookReal');
    } else {
        return redirect()->route('login');
    }
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/postBookReal', [BookRealController::class, 'postBookReal'])->name('bookReal.postBookReal');
    Route::get('/bookReals', [BookRealController::class, 'getBookReal'])->name('bookReal.getBookReal');
    Route::get('/ponder/{id}', [BookRealController::class, 'getPonder'])->name('bookReal.getPonder');
    Route::get('/comments/{postId}', [CommentController::class, 'index']);
    Route::post('/comments/{postId}', [CommentController::class, 'store']);
});

require __DIR__.'/auth.php';
