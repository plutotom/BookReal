<?php

namespace App\Http\Controllers;
use App\Models\BookReal;
use App\Models\Books;
use App\Models\Ponders;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class BookRealController extends Controller
{
    public function postBookReal(Request $request): \Illuminate\Http\RedirectResponse
    {
        $request->validate([
            "book" => "required",
            "ponder" => "required",
        ]);


        // book will be a book id


        $ponder = new Ponders();
        $ponder->book_id = $request->book;
        $ponder->ponder_text = $request->ponder;
        $ponder->user_id = auth()->user()->id;
        $ponder->quote = $request->quote;
        $ponder->save();

        return Redirect::route('bookReal.getBookReal');
    }


    public function getBookReal(): \Inertia\Response {
        $ponders = Ponders::orderBy('created_at', 'desc')->get()->toArray();

        foreach ($ponders as $key => $value) {
            $book_title = Books::find($ponders[$key]['book_id']);
            // dd($book_title . " " . $ponders[$key]['book_id']);
            $ponders[$key]['book_title'] = $book_title ? $book_title->title : null;

        }
        return Inertia::render('BookReals', [
            'bookReals' => $ponders,
        ]);
    }
}
