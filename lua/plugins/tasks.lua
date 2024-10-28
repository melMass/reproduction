return {
	"stevearc/overseer.nvim",
	lazy = true,
	event = "VeryLazy",
	config = function(_, opts)
		require("overseer").setup(opts)
	end,
	opts = {
		strategy = { "terminal" },
		templates = { "just", "npm" },
		component_aliases = {
			default = {
				{ "display_duration", detail_level = 2 },
				"on_output_summarize",
				"on_exit_set_status",
				"on_complete_notify",
				{ "on_complete_dispose", require_view = { "SUCCESS", "FAILURE" } },
			},
		},
		task_list = {
			keymap = false,
			bindings = {
				["?"] = "ShowHelp",
				["g?"] = "ShowHelp",
				["<CR>"] = "RunAction",
				["<C-e>"] = "Edit",
				["o"] = "Open",
				["<C-v>"] = "OpenVsplit",
				["<C-s>"] = "OpenSplit",
				["<C-f>"] = "OpenFloat",
				["<C-q>"] = "OpenQuickFix",
				["p"] = "TogglePreview",
				["<C-?>"] = "IncreaseDetail",
				["<C-!>"] = "DecreaseDetail",
				["L"] = "IncreaseAllDetail",
				["H"] = "DecreaseAllDetail",
				["["] = "DecreaseWidth",
				["]"] = "IncreaseWidth",
				["{"] = "PrevTask",
				["}"] = "NextTask",
				["K"] = "ScrollOutputUp",
				["J"] = "ScrollOutputDown",
				["q"] = "Close",
			},
		},
		task_launcher = {
			bindings = {
				i = {
					["<c-r>"] = function(task)
						local overseer = require("overseer")
						overseer.run_action(task, "open float")
					end,
				},
			},
		},
	},
}
