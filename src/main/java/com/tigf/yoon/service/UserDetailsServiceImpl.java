package com.tigf.yoon.service;

import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tigf.yoon.model.Member;
import com.tigf.yoon.repository.MemberRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	private MemberRepository memberRepository;
	
	public UserDetailsServiceImpl() {
		// TODO Auto-generated constructor stub
	}
	
	public UserDetailsServiceImpl(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String memberId) throws UsernameNotFoundException {
		Member user = memberRepository.findByMemberId(memberId);
		UserDetails userDetails = null;
		UserBuilder builder = org.springframework.security.core.userdetails.User.builder();
		
		if (user != null) {
			userDetails = builder.username(user.getMemberId())
					.password(user.getPassword())
					.roles(user.getRole())
					.build();
		}
		
		return userDetails;
	}
	
	public void saveMember(Member member) {
		memberRepository.save(member);
	}
}
