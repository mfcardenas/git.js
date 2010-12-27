window = global

require('../vendor/js-deflate/rawdeflate')
require('../vendor/js-deflate/rawinflate')
require('../vendor/sha1')
require('../lib/string_helpers')
require('../lib/binary_file')
require('../lib/jsgit')

JsGitTestData = {
  pack: [80, 65, 67, 75, 0, 0, 0, 2, 0, 0, 0, 5, 145, 12, 120, 156, 157, 204, 77, 10, 194, 48, 16, 64, 225, 125, 78, 49, 123, 65, 218, 252, 52, 9, 136, 40, 184, 244, 18, 99, 102, 130, 129, 164, 45, 233, 228, 254, 246, 12, 190, 229, 183, 120, 210, 153, 33, 89, 27, 173, 198, 232, 34, 6, 173, 209, 160, 15, 142, 201, 39, 139, 139, 11, 244, 137, 75, 156, 136, 102, 239, 20, 14, 249, 110, 29, 94, 184, 22, 174, 240, 30, 169, 99, 22, 184, 17, 174, 143, 92, 7, 175, 210, 145, 74, 194, 122, 77, 91, 187, 195, 172, 163, 177, 206, 122, 103, 224, 50, 157, 169, 83, 91, 17, 225, 255, 15, 234, 73, 4, 7, 182, 189, 50, 228, 82, 249, 80, 63, 157, 99, 59, 198, 160, 4, 120, 156, 51, 52, 48, 48, 51, 49, 81, 8, 114, 117, 116, 241, 117, 101, 248, 171, 37, 219, 177, 129, 183, 133, 241, 192, 132, 250, 195, 143, 46, 63, 138, 103, 220, 29, 244, 220, 196, 0, 8, 20, 114, 50, 147, 24, 214, 5, 138, 78, 123, 220, 119, 173, 244, 54, 27, 243, 66, 19, 63, 191, 87, 250, 146, 110, 38, 0, 237, 58, 24, 59, 181, 4, 120, 156, 11, 73, 45, 46, 81, 8, 74, 45, 200, 55, 228, 178, 133, 3, 46, 46, 175, 82, 160, 112, 162, 66, 9, 72, 182, 8, 40, 171, 144, 150, 95, 164, 80, 156, 159, 155, 90, 146, 145, 153, 151, 174, 224, 169, 158, 171, 80, 158, 95, 148, 13, 98, 231, 231, 113, 1, 0, 239, 156, 22, 95, 162, 2, 120, 156, 51, 52, 48, 48, 51, 49, 81, 72, 203, 207, 215, 203, 42, 102, 120, 186, 106, 253, 246, 114, 209, 200, 155, 183, 117, 111, 200, 7, 197, 60, 55, 232, 46, 47, 20, 0, 0, 214, 161, 13, 153, 190, 1, 120, 156, 211, 215, 87, 112, 204, 83, 72, 173, 72, 204, 45, 200, 73, 85, 240, 74, 44, 75, 12, 78, 46, 202, 44, 40, 81, 72, 203, 204, 73, 229, 2, 0, 150, 63, 10, 27, 112, 162, 38, 201, 64, 200, 237, 148, 228, 62, 53, 100, 240, 52, 119, 16, 115, 91, 161, 48, 48, 48, 54, 1, 154, 48, 48, 48, 48],
  // "
  discovery: "001e# service=git-upload-pack\n0000009bb3453be87b70a0c5dea28aacd49cf34ddb91a8c5 HEAD\000multi_ack thin-pack side-band side-band-64k ofs-delta shallow no-progress include-tag multi_ack_detailed\n003fb3453be87b70a0c5dea28aacd49cf34ddb91a8c5 refs/heads/master\n0000"
}

exports['parseDiscovery'] = function(test) {
  test.deepEqual(JsGit.parseDiscovery(JsGitTestData.discovery), {
    "capabilities":"multi_ack thin-pack side-band side-band-64k ofs-delta shallow no-progress include-tag multi_ack_detailed",
    "refs":[
        {"name":"HEAD", "sha":"b3453be87b70a0c5dea28aacd49cf34ddb91a8c5"},
        {"name":"refs/heads/master", "sha":"b3453be87b70a0c5dea28aacd49cf34ddb91a8c5"}
      ]
    }, "Decodes the capabilities and refs from the discovery response.")
  test.done();
}

exports['parsePack'] = function(test) {
  test.deepEqual(JsGit.packFileParserFor(JsGitTestData.pack).parse().getObjects(),
[ { sha: 'b3453be87b70a0c5dea28aacd49cf34ddb91a8c5'
  , data: 'tree c44942a959a822a3a785ed7c4a658db9690dd175\nauthor Daniel Lucraft <dan@fluentradical.com> 1293454753 +0000\ncommitter Daniel Lucraft <dan@fluentradical.com> 1293454753 +0000\n\nAdd sample files\n'
  }
, { sha: 'c44942a959a822a3a785ed7c4a658db9690dd175'
  , data: '100644 README\u0000\u00fd*\u001d\u0088\u00b0\r\u0084\u0001\u00c0\u0090\177\u00c3\u00e2\u00d3\u00e2_\u0001\u00bbR\u00e740000 lib\u0000\u00aeQ\u0015\u0096\u00e3\u008e\u00d6u\u00db\u0006\u0003\u00a14NN\u00ea/\u0019F4'
  }
, { sha: 'fd2a1d88b00d8401c0907fc3e2d3e25f01bb52e7'
  , data: 'Test Repo1\n==========\n\nJust a test repo for something I\'m working on\n'
  }
, { sha: 'ae511596e38ed675db0603a1344e4eea2f194634'
  , data: '100644 foo.js\u0000\u00e5\u00aa\u00af\u00b7w\u0015Y\u00d9\u00db-\u00d8\u001fR\\\u00e70\u008bwq\u0010'
  }
, { sha: 'e5aaafb7771559d9db2dd81f525ce7308b777110'
  , data: '// An example JavaScript file\n'
  }
])
  test.done()
}

exports['nextPktLine()'] = function(test) {
  test.equal(JsGit.nextPktLine("0008NAK\nasdflijasdfj"), "NAK\n")
  test.done()
}
