<?php

namespace App\Http\Controllers;

use App\Models\Books;
use App\Models\Comments;
use App\Models\Ponders;
use App\Models\PonderWeek;
use Carbon\Carbon;
// use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

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

        // $ponders = Ponders::with(['comments' => function (HasMany $query) {
        //     $query->where('parent_id', null);
        // }])
        $ponders = Ponders::with('comments')
            ->join('books', 'ponders.book_id', '=', 'books.id')
            ->whereBetween('ponders.created_at', [$start, $end])
            ->whereIn(DB::raw('DATE(ponders.created_at)'), $userPonderDates)
            ->orderBy('ponders.created_at', 'desc')
            ->select('ponders.*', 'books.title as book_title')
            ->get()
            ->groupBy(function ($ponder) {
                return $ponder->created_at->format('Y-m-d');
            })
            ->toArray();
        // dump($ponders);
        $books = Books::where('user_id', auth()->user()->id)
            ->get()
            ->toArray();

        return Inertia::render('BookReals', [
            'bookReals' => $ponders,
            'usersBooks' => $books,
            'canPonder' => $canPonder,
        ]);
    }

    public function getPonder($id): \Inertia\Response {
        $ponder = Ponders::with('comments')
            ->join('books', 'ponders.book_id', '=', 'books.id')
            ->join('comments', 'ponders.id', '=', 'comments.ponder_id')
            // ->whereNotNull('comments.parent_id')
            ->where('ponders.id', $id)
            ->select('ponders.*', 'books.title as book_title')
            ->first()
            ->toArray();
        // dump($ponder);

        return Inertia::render('Ponder', [
            'ponder' => $ponder,
        ]);
    }
}
