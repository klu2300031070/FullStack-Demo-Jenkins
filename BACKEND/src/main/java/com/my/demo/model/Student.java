package com.my.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class Student {
	
	@Id
	private int id;
	
	@Column
	private String name;
	
	@Column
	private String branch;

	@Override
	public String toString() {
		return "Student [id=" + id + ", name=" + name + ", Branch=" + branch + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}
	
	

}
