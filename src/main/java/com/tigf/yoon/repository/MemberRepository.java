package com.tigf.yoon.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tigf.yoon.model.Member;

@Repository
public interface MemberRepository extends CrudRepository<Member, String> {
	public Member findByMemberId(String memberId);
}
