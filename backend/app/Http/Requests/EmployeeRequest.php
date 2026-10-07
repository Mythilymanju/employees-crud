<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $employee = $this->route('employee');
        $id = $employee ? $employee->id : null;

        return [
            'name'       => 'required|string|max:255',
            'email'      => ['required', 'email', 'max:255', Rule::unique('employees', 'email')->ignore($id)],
            'phone'      => 'required|string|max:20',
            'department' => 'required|string|max:255',
        ];
    }
}