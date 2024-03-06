<?php
namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class TeacherController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Teacher::select('id', 'name', 'sex', 'age')->get();
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
            'age' => 'required',
            'sex' => 'required'
            // 'image' => 'required|image'
        ]);

        try {

            $Teacher = new Teacher();
            $Teacher->name = $request->name;
            $Teacher->age = $request->age;
            $Teacher->sex = $request->sex;

            if ($Teacher->save()) {
                return response()->json([
                    'message' => 'Teacher Created Successfully!!'
                ]);
            } else {
                return response()->json([
                    'message' => 'Something goes wrong while creating a Teacher!!'
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
     * @param \App\Models\Teacher $Teacher
     * @return \Illuminate\Http\Response
     */
    public function show(Teacher $Teacher)
    {
        return response()->json([
            'Teacher' => $Teacher
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Teacher $Teacher
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Teacher $Teacher)
    {
        return 's';
        $request->validate([
            'name' => 'required',
            'class' => 'required'
        ]);

        try {

            if ($Teacher->fill($request->post())
                ->update()) {

                $Teacher->save();
            }

            return response()->json([
                'message' => 'Teacher Updated Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while updating a Teacher!!'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Teacher $Teacher
     * @return \Illuminate\Http\Response
     */
    public function destroy(Teacher $Teacher)
    {
        try {

            if ($Teacher->image) {
                $exists = Storage::disk('public')->exists("Teacher/image/{$Teacher->image}");
                if ($exists) {
                    Storage::disk('public')->delete("Teacher/image/{$Teacher->image}");
                }
            }

            $Teacher->delete();

            return response()->json([
                'message' => 'Teacher Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a Teacher!!'
            ]);
        }
    }
}
