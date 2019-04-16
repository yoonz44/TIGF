package com.tigf.yoon.repository;

import org.springframework.data.repository.CrudRepository;

import com.tigf.yoon.model.SalaryStats;

public interface SalaryStatsRepository extends CrudRepository<SalaryStats, Long> {
	public SalaryStats findByMember_IdAndSalaryDate(String memberId, String salaryDate);
}
