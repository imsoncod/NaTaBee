let should = require('should');
let request = require('supertest');
let app = require('./app');

describe('GET /natabee/test 서버 테스팅 API', () => {
	it('Success : Server Testing', (done) => {
		request(app)
			.get('/natabee/test')
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
});

describe('POST /natabee/etc 기타 API', () => {
	it('Success : 학과 소개 사이트', (done) => {
		let params = {
				  "intent": {
					    "id": "string",
					    "name": "string"
					  },
					  "userRequest": {
					    "timezone": "string",
					    "params": {
					      "ignoreMe": "string"
					    },
					    "block": {
					      "id": "string",
					      "name": "string"
					    },
					    "utterance": "string",
					    "lang": "string",
					    "user": {
					      "id": "string",
					      "type": "string",
					      "properties": {}
					    }
					  },
					  "bot": {
					    "id": "string",
					    "name": "string"
					  },
					  "action": {
					    "name": "string",
					    "clientExtra": "string",
					    "params": {
					      "dept": "컴퓨터시스템과"
					    },
					    "id": "string",
					    "detailParams": {
					      "dept": {
					        "origin": "string",
					        "value": "string",
					        "groupName": "string"
					      }
					    }
					  }
					};
		
		request(app)
			.post('/natabee/etc/dept')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
	
	it('Success : 원점메아리', (done) => {
		let params = {
				  "intent": {
					    "id": "string",
					    "name": "string"
					  },
					  "userRequest": {
					    "timezone": "string",
					    "params": {
					      "ignoreMe": "string"
					    },
					    "block": {
					      "id": "string",
					      "name": "string"
					    },
					    "utterance": "string",
					    "lang": "string",
					    "user": {
					      "id": "string",
					      "type": "string",
					      "properties": {}
					    }
					  },
					  "bot": {
					    "id": "string",
					    "name": "string"
					  },
					  "action": {
					    "name": "string",
					    "clientExtra": "string",
					    "params": {},
					    "id": "string",
					    "detailParams": {}
					  }
					};
		
		request(app)
			.post('/natabee/etc/news')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
});

describe('POST /natabee/info 정보광장 API', () => {
	let params = {
			  "intent": {
				    "id": "string",
				    "name": "string"
				  },
				  "userRequest": {
				    "timezone": "string",
				    "params": {
				      "ignoreMe": "string"
				    },
				    "block": {
				      "id": "string",
				      "name": "string"
				    },
				    "utterance": "string",
				    "lang": "string",
				    "user": {
				      "id": "string",
				      "type": "string",
				      "properties": {}
				    }
				  },
				  "bot": {
				    "id": "string",
				    "name": "string"
				  },
				  "action": {
				    "name": "string",
				    "clientExtra": "string",
				    "params": {},
				    "id": "string",
				    "detailParams": {}
				  }
				};
	
	it('Success : 삽니다 & 팝니다', (done) => {
		request(app)
			.post('/natabee/info/market')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
	
	it('Success : 원점메아리', (done) => {
		request(app)
			.post('/natabee/info/lost')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
});

describe('POST /natabee/library 도서관 API', () => {
	it('Success : 도서 검색', (done) => {
		let params = {
				  "intent": {
					    "id": "string",
					    "name": "string"
					  },
					  "userRequest": {
					    "timezone": "string",
					    "params": {
					      "ignoreMe": "string"
					    },
					    "block": {
					      "id": "string",
					      "name": "string"
					    },
					    "utterance": "string",
					    "lang": "string",
					    "user": {
					      "id": "string",
					      "type": "string",
					      "properties": {}
					    }
					  },
					  "bot": {
					    "id": "string",
					    "name": "string"
					  },
					  "action": {
					    "name": "string",
					    "clientExtra": "string",
					    "params": {
					      "book_name": "데이터베이스"
					    },
					    "id": "string",
					    "detailParams": {
					      "book_name": {
					        "origin": "string",
					        "value": "string",
					        "groupName": "string"
					      }
					    }
					  }
					}
		
		request(app)
			.post('/natabee/library/search')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
	
	it('Success : 좌석 예약', (done) => {
		let params = {
				  "intent": {
					    "id": "string",
					    "name": "string"
					  },
					  "userRequest": {
					    "timezone": "string",
					    "params": {
					      "ignoreMe": "string"
					    },
					    "block": {
					      "id": "string",
					      "name": "string"
					    },
					    "utterance": "string",
					    "lang": "string",
					    "user": {
					      "id": "string",
					      "type": "string",
					      "properties": {}
					    }
					  },
					  "bot": {
					    "id": "string",
					    "name": "string"
					  },
					  "action": {
					    "name": "string",
					    "clientExtra": "string",
					    "params": {
					      "user_id": "201645018"
					    },
					    "id": "string",
					    "detailParams": {
					      "user_id": {
					        "origin": "string",
					        "value": "string",
					        "groupName": "string"
					      }
					    }
					  }
					}
		
		request(app)
			.post('/natabee/library/seat')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
});

describe('POST /natabee/menu 식당메뉴 API', () => {
	let params = {
			  "intent": {
				    "id": "string",
				    "name": "string"
				  },
				  "userRequest": {
				    "timezone": "string",
				    "params": {
				      "ignoreMe": "string"
				    },
				    "block": {
				      "id": "string",
				      "name": "string"
				    },
				    "utterance": "string",
				    "lang": "string",
				    "user": {
				      "id": "string",
				      "type": "string",
				      "properties": {}
				    }
				  },
				  "bot": {
				    "id": "string",
				    "name": "string"
				  },
				  "action": {
				    "name": "string",
				    "clientExtra": "string",
				    "params": {},
				    "id": "string",
				    "detailParams": {}
				  }
				};
	
	it('Success : 학생 식당메뉴', (done) => {
		request(app)
			.post('/natabee/menu/student')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
	
	it('Success : 교직원 식당메뉴', (done) => {
		request(app)
			.post('/natabee/menu/professor')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
});

describe('POST /natabee/notice 공지사항 API', () => {
	let params = {
			  "intent": {
				    "id": "string",
				    "name": "string"
				  },
				  "userRequest": {
				    "timezone": "string",
				    "params": {
				      "ignoreMe": "string"
				    },
				    "block": {
				      "id": "string",
				      "name": "string"
				    },
				    "utterance": "string",
				    "lang": "string",
				    "user": {
				      "id": "string",
				      "type": "string",
				      "properties": {}
				    }
				  },
				  "bot": {
				    "id": "string",
				    "name": "string"
				  },
				  "action": {
				    "name": "string",
				    "clientExtra": "string",
				    "params": {},
				    "id": "string",
				    "detailParams": {}
				  }
				};
	
	it('Success : 입학 공지사항', (done) => {
		request(app)
			.post('/natabee/notice/admission')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
	
	it('Success : 캠퍼스라이프 공지사항', (done) => {
		request(app)
			.post('/natabee/notice/campuslife')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
	
	it('Success : 주간 주요일정', (done) => {
		request(app)
			.post('/natabee/notice/plan')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
});

describe('POST /natabee/phone 전화번호 검색 API', () => {
	it('Success : 전화번호 검색 - 성명', (done) => {
		let params = {
				  "intent": {
					    "id": "string",
					    "name": "string"
					  },
					  "userRequest": {
					    "timezone": "string",
					    "params": {
					      "ignoreMe": "string"
					    },
					    "block": {
					      "id": "string",
					      "name": "string"
					    },
					    "utterance": "string",
					    "lang": "string",
					    "user": {
					      "id": "string",
					      "type": "string",
					      "properties": {}
					    }
					  },
					  "bot": {
					    "id": "string",
					    "name": "string"
					  },
					  "action": {
					    "name": "string",
					    "clientExtra": "string",
					    "params": {
					      "phone_name": "김기태"
					    },
					    "id": "string",
					    "detailParams": {
					      "phone_name": {
					        "origin": "string",
					        "value": "string",
					        "groupName": "string"
					      }
					    }
					  }
					}
		
		request(app)
			.post('/natabee/phone/name')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
	
	it('Success : 전화번호 검색 - 소속명', (done) => {
		let params = {
				  "intent": {
					    "id": "string",
					    "name": "string"
					  },
					  "userRequest": {
					    "timezone": "string",
					    "params": {
					      "ignoreMe": "string"
					    },
					    "block": {
					      "id": "string",
					      "name": "string"
					    },
					    "utterance": "string",
					    "lang": "string",
					    "user": {
					      "id": "string",
					      "type": "string",
					      "properties": {}
					    }
					  },
					  "bot": {
					    "id": "string",
					    "name": "string"
					  },
					  "action": {
					    "name": "string",
					    "clientExtra": "string",
					    "params": {
					      "phone_dept": "컴퓨터"
					    },
					    "id": "string",
					    "detailParams": {
					      "phone_dept": {
					        "origin": "string",
					        "value": "string",
					        "groupName": "string"
					      }
					    }
					  }
					}
		
		request(app)
			.post('/natabee/phone/dept')
			.send(params)
			.expect(200)
			.end((err, res) => {
				if(err){
					throw err;
				}
				done();
			});
	});
});

process.exit();