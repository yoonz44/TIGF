package com.tigf.yoon.service;

import org.springframework.stereotype.Service;

import com.tigf.yoon.model.Member;
import com.tigf.yoon.repository.MemberRepository;

@Service
public class MemberService {
	private MemberRepository memberRepository;
	
	public MemberService(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	public void saveMember(Member member) {
		memberRepository.save(member);
	}
	
}
