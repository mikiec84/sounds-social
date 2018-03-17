import { chai } from 'meteor/practicalmeteor:chai'
import { getCurrentPage } from './getCurrentPage'

describe('getCurrentPage', function() {
  it('works as expected', function() {
    chai.expect(getCurrentPage({ limit: 20 })).to.equal(1)
    chai.expect(getCurrentPage({ limit: 20, skip: 19 })).to.equal(1)
    chai.expect(getCurrentPage({ limit: 20, skip: 20 })).to.equal(2)
    chai.expect(getCurrentPage({ limit: 20, skip: 60 })).to.equal(4)
    chai.expect(getCurrentPage({ limit: 0, skip: 60 })).to.equal(-1)
  })
})
