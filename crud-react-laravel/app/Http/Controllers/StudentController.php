<?php
namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use App\Models\Teacher;
use App\Models\Subject;

class StudentController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Student::select('id', 'name', 'sex', 'age', 'roll_no', 'class', 'teacher_id', 'subject_id', 'teacher_id')->get();
    }

    public function getSearchStudent($text)
    {
        return Student::select('id', 'name', 'sex', 'age', 'roll_no', 'class', 'teacher_id', 'subject_id', 'teacher_id')->where('name', 'like', '%' . $text . '%')->get();
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
            'sex' => 'required',
            'class' => 'required',
            // 'teacher_id' => 'required',
            'subject_id' => 'required',
            'roll_no' => 'required'
        ]);

        try {
            $Student = new Student();
            $Student->name = $request->name;
            $Student->age = $request->age;
            $Student->sex = $request->sex;
            $Student->class = $request->class;
            $Student->roll_no = $request->roll_no;
            $Student->teacher_id = $request->teacher_id;
            $Student->subject_id = $request->subject_id;

            if ($Student->save()) {
                return response()->json([
                    'message' => 'Student Created Successfully!!'
                ]);
            } else {
                return response()->json([
                    'message' => 'Something goes wrong while creating a Student!!'
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
     * @param \App\Models\Student $Student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $Student)
    {
        return response()->json([
            'Student' => $Student
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Student $Student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Student $Student)
    {
        return 's';
        $request->validate([
            'name' => 'required',
            'class' => 'required'
        ]);

        try {

            if ($Student->fill($request->post())
                ->update()) {

                $Student->save();
            }

            return response()->json([
                'message' => 'Student Updated Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while updating a Student!!'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Student $Student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $Student)
    {
        try {

            if ($Student->image) {
                $exists = Storage::disk('public')->exists("Student/image/{$Student->image}");
                if ($exists) {
                    Storage::disk('public')->delete("Student/image/{$Student->image}");
                }
            }

            $Student->delete();

            return response()->json([
                'message' => 'Student Deleted Successfully!!'
            ]);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a Student!!'
            ]);
        }
    }

    public function getRelatedData(Request $request)
    {
        $teachers = Teacher::select('id', 'name', 'sex', 'age')->get();
        $subjects = Subject::select('id', 'name', 'class', 'language')->get();

        $response = [
            'subjects' => $subjects,
            'teachers' => $teachers
        ];

        return $response;
    }

    public function getStudentSubjects($id)
    {
        $data = [];
        $student = Student::find($id);
        if ($student) {
            $ids = $student->subject_id;
            if (! empty($ids)) {
                $student_subject = explode(',', $ids);
                $subjects = Subject::whereIn('id', $student_subject)->select('id', 'name', 'teacher_id')
                    ->get()
                    ->toArray();
                foreach ($subjects as $subject) {
                    $teacher_ids = explode(',', $subject['teacher_id']);
                    $teachers = Teacher::whereIn('id', $teacher_ids)->pluck('name')->toArray();
                    // $data[$subject['name']] = implode(',', $teachers);

                    $row['subject'] = $subject['name'];
                    $row['teachers'] = implode(',', $teachers);
                    $data[] = $row;
                }
            }
        }
        return $data;
    }

    public function getStudent($id)
    {
        return Student::find($id);
    }
}

