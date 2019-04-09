package com.tigf.yoon.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Id;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Data
@Entity
@EntityListeners(value = { AuditingEntityListener.class })
public class Member {
	/**
	 * 아이디
	 */
	@Id
	private String memberId;
	/**
	 * 패스워드
	 */
	private String password;
	/**
	 * 이메일
	 */
	private String email;
	/**
	 * 연봉
	 */
	private String salary;
	/**
	 * 권한
	 */
	private String role;
	/**
	 * 생성일자
	 */
	@CreatedDate
	private LocalDateTime createdDate;
}
