<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($postId)
    {
        $comments = Comments::where('post_id', $postId)->get();
        return response()->json($comments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $postId)
    {

        $request->validate([
            'content' => 'required',
            'parentId' => 'nullable|exists:comments,id'
        ]);

        // public function up(): void
        // {
        //     Schema::create('comments', function (Blueprint $table) {
        //         $table->id();
        //         $table->timestamps();

        //         $table->foreignId('user_id')->constrained('users');
        //         $table->foreignId('ponder_id')->constrained('ponders');
        //         $table->string('comment_text', 1000);

        //         $table->foreignId('parent_id')->nullable()->constrained('comments');

        //     });
        // }
        $comment = new Comments();
        $comment->comment_text = $request->get('content');
        $comment->ponder_id = $postId;
        $comment->parent_id = $request->get('parentId');
        $comment->user_id = auth()->user()->id;

        $comment->save();

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $postId, $commentId)
    {
        $comment = Comments::findOrFail($commentId);

        $request->validate([
            'content' => 'required',
        ]);

        $comment->content = $request->get('content');
        $comment->save();

        return response()->json($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
