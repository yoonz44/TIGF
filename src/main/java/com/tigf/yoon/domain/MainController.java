package com.tigf.yoon.domain;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.tigf.yoon.model.Member;
import com.tigf.yoon.service.MemberService;

@Controller
public class MainController {
	private MemberService memberService;
	
	public MainController(MemberService memberService) {
		this.memberService = memberService;
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@PostMapping("/member")
	public void saveMember(Member member) {
		memberService.saveMember(member);
	}
	
	@GetMapping("/main")
	public String main() {
		return "main";
	}
	
	@GetMapping("/signUp")
	public String signUp() {
		return "signUp";
	}

}
