import { chai } from 'meteor/practicalmeteor:chai'
import { getPagesCount } from './getPagesCount'

describe('getPagesCount', function() {
  it('works as expected', function() {
    chai.expect(getPagesCount({ limit: 20, totalCount: 100 })).to.equal(5)
    chai.expect(getPagesCount({ limit: 20, totalCount: 12 })).to.equal(1)
    chai.expect(getPagesCount({ limit: 20, totalCount: 101 })).to.equal(6)
    chai.expect(getPagesCount({ limit: 20, totalCount: 120 })).to.equal(6)
    chai.expect(getPagesCount({ limit: 0, totalCount: 120 })).to.equal(-1)
  })
})
