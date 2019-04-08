package com.tigf.yoon.repository;

import org.springframework.data.repository.CrudRepository;

import com.tigf.yoon.model.Member;

public interface MemberRepository extends CrudRepository<Member, String> {
	public Member findByMemberId(String memberId);
}
