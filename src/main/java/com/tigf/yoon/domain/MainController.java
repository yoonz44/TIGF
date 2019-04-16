package com.tigf.yoon.domain;

import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.tigf.yoon.model.Member;
import com.tigf.yoon.model.SalaryStats;
import com.tigf.yoon.service.MemberService;
import com.tigf.yoon.service.SalaryStatsService;

@Controller
public class MainController {
	private MemberService memberService;
	private SalaryStatsService salaryStatsService;
	
	public MainController(MemberService memberService, SalaryStatsService salaryStatsService) {
		this.memberService = memberService;
		this.salaryStatsService = salaryStatsService;
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@PostMapping("/member")
	public String saveMember(Member member) {
		memberService.saveMember(member);
		
		return "redirect:/login";
	}
	
	@GetMapping("/main")
	public String main() {
		return "main";
	}
	
	@GetMapping("/member")
	public String member() {
		return "member";
	}
	
	@PostMapping("/main/salary")
	public void saveSalaryStat(@Valid @RequestBody SalaryStats salaryStats) {
		salaryStatsService.saveSalary(salaryStats);
	}

}
