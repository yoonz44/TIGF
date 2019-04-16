package com.tigf.yoon.model;

import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Data;

@Data
@Entity
@EntityListeners(value = { AuditingEntityListener.class })
public class SalaryStats {
	/**
	 * stat아이디
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long statId;
	/**
	 * 유저아이디
	 */
	@ManyToOne(cascade = {CascadeType.ALL})
	@JoinColumn(name = "memberId")
	private Member member;
	/**
	 * 일일야근수당
	 */
	private double salarySum;
	/**
	 * 일일야근시간
	 */
	private double salaryTime;
	/**
	 * 연봉
	 */
	private String salary;
	/**
	 * 일자
	 */
	private String salaryDate;
	/**
	 * 생성일자
	 */
	@CreatedDate
	private LocalDateTime createdDate;
}
