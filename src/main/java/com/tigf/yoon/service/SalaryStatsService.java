package com.tigf.yoon.service;

import org.springframework.stereotype.Service;

import com.tigf.yoon.model.SalaryStats;
import com.tigf.yoon.repository.SalaryStatsRepository;

@Service
public class SalaryStatsService {
	private SalaryStatsRepository salaryStatsRepository;

	public SalaryStatsService(SalaryStatsRepository salaryStatsRepository) {
		this.salaryStatsRepository = salaryStatsRepository;
	}
	
	public void saveSalary(SalaryStats salaryStats) {
		SalaryStats tempSalaryStats = salaryStatsRepository.findByMember_IdAndSalaryDate(salaryStats.getMember().getId(), salaryStats.getSalaryDate());
		
		if (tempSalaryStats != null) {
			salaryStats.setStatId(tempSalaryStats.getStatId());
		}
		
		salaryStatsRepository.save(salaryStats);
	}

}
