<?php

namespace App\Http\Controllers;
use App\Models\BookReal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class BookRealController extends Controller
{
    public function postBookReal(Request $request){
        $request->validate([
            "title"=> "required",
            "ponder"=> "required",
        ]);

        $bookReal = new BookReal();
        $bookReal->title = $request->title;
        $bookReal->ponder = $request->ponder;
        $bookReal->user_id = auth()->user()->id;
        $bookReal->quote = $request->quote;
        $bookReal->save();
        
        // dd($request->all());
        return Redirect::route('bookReal.getBookReal');        
        // return Inertia::render('Dashboard');

    }
    public function getBookReal(Request $request){
        $bookReals = BookReal::orderBy('created_at', 'desc')->get();
        return Inertia::render('BookReals', [
            'bookReals' => $bookReals,
        ]);
    }
}
