<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\StudentController;

/*
 * |--------------------------------------------------------------------------
 * | API Routes
 * |--------------------------------------------------------------------------
 * |
 * | Here is where you can register API routes for your application. These
 * | routes are loaded by the RouteServiceProvider within a group which
 * | is assigned the "api" middleware group. Enjoy building your API!
 * |
 */

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::resource('subject', SubjectController::class);
Route::resource('teacher', TeacherController::class);
Route::resource('student', StudentController::class);

Route::any('get-teachers', [
    SubjectController::class,
    'getTeachers'
]);

Route::any('get-related-data', [
    StudentController::class,
    'getRelatedData'
]);

Route::any('get-student-subjects/{id}', [
    StudentController::class,
    'getStudentSubjects'
]);

Route::any('get-student/{id}', [
    StudentController::class,
    'getStudent'
]);
Route::any('student-search/{text}', [
    StudentController::class,
    'getSearchStudent'
]);

