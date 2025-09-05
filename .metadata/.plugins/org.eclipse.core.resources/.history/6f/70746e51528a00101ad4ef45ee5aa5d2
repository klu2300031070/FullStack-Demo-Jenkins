package com.my.demo.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import com.my.demo.model.Student;
import com.my.demo.repository.StudentRepo;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@CrossOrigin(origins = "*")
public class StudentController extends SpringBootServletInitializer {
	@Autowired
	private StudentRepo r; 

	@GetMapping("/")
	public String home() {
		return "Welcome";
	}
	@PostMapping("/add")
	public ResponseEntity<Student> addStudent(@RequestBody Student student) {
		Student savedStudent = r.save(student);
		return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
	}
	
	@GetMapping("/view")
	public Student getMethodName(@RequestParam int s) {
		Student st=r.findById(s).orElse(null);
		return st;
		}
	@GetMapping("/viewall")
	public ResponseEntity<List<Student>> getallstudents() {
		List<Student> s=r.findAll();
		return new ResponseEntity<>(s, HttpStatus.OK);	
	}
	
	
	
}
