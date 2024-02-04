<?php

namespace App\Http\Controllers;

use App\Models\Books;
use App\Models\Ponders;
use App\Models\PonderWeek;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BookRealController extends Controller {
    public function postBookReal(Request $request): \Illuminate\Http\RedirectResponse {
        $request->validate([
            'book' => $request->newBook ? '' : 'required',
            'ponder' => 'required',
        ]);

        $ponder = new Ponders;
        if ($request->newBook) {
            $book = new Books;
            $book->title = $request->newBook;
            $book->user_id = auth()->user()->id;
            $book->save();

            $ponder->book_id = $book->id;
        } else {
            $ponder->book_id = $request->book;
        }

        $ponder->ponder_text = $request->ponder;
        $ponder->user_id = auth()->user()->id;
        $ponder->quote = $request->quote;
        $ponder->save();

        return Redirect::route('bookReal.getBookReal');
    }

    public function getBookReal(): \Inertia\Response {
        $ponderWeek = PonderWeek::latest()->select('week_start_date', 'week_end_date')->first();
        $userRecentPonder = Ponders::where('user_id', auth()->user()->id)->latest()->select('created_at')->first();

        if ($ponderWeek && $userRecentPonder) {
            $start = $ponderWeek->week_start_date;
            $end = $ponderWeek->week_end_date;
            $userRecentPonder = $userRecentPonder->created_at;

            if ($userRecentPonder->between($start, $end)) {
                $canPonder = true;
            } else {
                $canPonder = false;
            }
        } else {
            $canPonder = false;
        }

        if (! $canPonder) {
            return Inertia::render('BookReals', [
                'canPonder' => $canPonder,
            ]);
        }

        $ponderWeek = PonderWeek::latest()->select('week_start_date', 'week_end_date')->first();
        $userPonderDates = Ponders::where('user_id', auth()->user()->id)
            ->whereBetween('created_at', [$ponderWeek->week_start_date, $ponderWeek->week_end_date])
            ->pluck('created_at')
            ->map(function ($date) {
                return Carbon::parse($date)->toDateString();
            })
            ->toArray();

        $temp = collect([
            [
                'id' => 12,
                'created_at' => '2024-02-03T23:06:14.000000Z',
                'updated_at' => '2024-02-03T23:06:14.000000Z',
                'user_id' => 999,
                'book_id' => '11',
                'quote' => 'really old one',
                'ponder_text' => 'really old one ponder text',
                'book_title' => 'Art and Fiath',
            ],
            [
                'id' => 13,
                'created_at' => '2024-02-02T23:02:14.000000Z',
                'updated_at' => '2024-02-03T23:06:14.000000Z',
                'user_id' => 999,
                'book_id' => '11',
                'quote' => 'really old one',
                'ponder_text' => 'really old one ponder text',
                'book_title' => 'Art and Fiath',
            ],
            [
                'id' => 14,
                'created_at' => '2024-02-01T23:06:14.000000Z',
                'updated_at' => '2024-02-03T23:06:14.000000Z',
                'user_id' => 999,
                'book_id' => '11',
                'quote' => 'really old one',
                'ponder_text' => 'really old one ponder text',
                'book_title' => 'Art and Fiath',
            ],
            [
                'id' => 14,
                'created_at' => '2024-01-31T23:06:14.000000Z',
                'updated_at' => '2024-02-03T23:06:14.000000Z',
                'user_id' => 999,
                'book_id' => '11',
                'quote' => 'really old one',
                'ponder_text' => 'really old one ponder text',
                'book_title' => 'Art and Fiath',
            ],
        ]);


        // $datesArr = [
        //     "2024-02-03",
        //     "2024-02-02",
        //     "2024-02-02",
        //     "2024-01-31",
        // ];

        $ponders = Ponders::join('books', 'ponders.book_id', '=', 'books.id')
            // ->whereBetween('ponders.created_at', [$start, $end])
            ->whereIn(DB::raw('DATE(ponders.created_at)'), $userPonderDates)
            ->orderBy('ponders.created_at', 'desc')
            ->select('ponders.*', 'books.title as book_title')
            ->get()
            ->groupBy(function ($ponder) {
                return $ponder->created_at->format('Y-m-d');
            })
            ->toArray();


        $books = Books::where('user_id', auth()->user()->id)
            ->get()
            ->toArray();


        return Inertia::render('BookReals', [
            'bookReals' => $ponders,
            'usersBooks' => $books,
            'canPonder' => $canPonder,
        ]);
    }
}
