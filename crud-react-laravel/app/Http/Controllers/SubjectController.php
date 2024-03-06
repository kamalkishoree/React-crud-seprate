<?php
namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Models\Teacher;

class SubjectController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Subject::select('id', 'name', 'language', 'class', 'teacher_id')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'class' => 'required'

            // 'image' => 'required|image'
        ]);
        try {
            $Subject = new Subject();
            $Subject->name = $request->name;
            $Subject->class = $request->class;
            $Subject->language = $request->language;
            $Subject->teacher_id = $request->teacher_id;

            if ($Subject->save()) {
                return response()->json([
                    'message' => 'Product Created Successfully!!'
                ]);
            } else {
                return response()->json([
                    'message' => 'Something goes wrong while creating a Subject!!'
                ], 500);
            }
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Subject $Subject
     * @return \Illuminate\Http\Response
     */
    public function show(Subject $Subject)
    {
        return response()->json([
            'Subject' => $Subject
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Subject $Subject
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subject $Subject)
    {
        $request->validate([
            'name' => 'required',
            'class' => 'required'
        ]);

        try {

            if ($Subject->fill($request->post())
                ->update()) {

                $Subject->save();
            }

            return response()->json([
                'message' => 'Subject Updated Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while updating a Subject!!'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Subject $Subject
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subject $Subject)
    {
        try {

            if ($Subject->image) {
                $exists = Storage::disk('public')->exists("Subject/image/{$Subject->image}");
                if ($exists) {
                    Storage::disk('public')->delete("Subject/image/{$Subject->image}");
                }
            }

            $Subject->delete();

            return response()->json([
                'message' => 'Subject Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a Subject!!'
            ]);
        }
    }

    public function getTeachers($ids)
    {
        return print_r($ids);
        return Teacher::select('name')->whereId([
            $ids
        ]);
    }
}
